<template>
  <div>
    <h2>User Settings</h2>
    <b-form novalidate @submit="updateUser">
      <b-row>
        <b-col>
          <b-form-group label="Profile Picture" label-for="profile-picture">
            <img v-if="avatarImage" :src="avatarImage" class="avatar" />
            <b-avatar v-else size="15rem" :text="userInitials" variant="primary" />
            <b-form-file
              id="profile-picture"
              v-model="imageFile"
              :state="isFileValid"
              accept="image/*"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            />
            <b-form-invalid-feedback :state="isFileValid">
              Please select an image file type.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          The rest of the form...
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Save Changes</b-button>
    </b-form>
  </div>
</template>

<script>
import s3, { bucketName } from '@/helpers/init-aws';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserSettings',

  data() {
    return {
      imageFile: null,
      photos: [],
    };
  },

  computed: {
    ...mapGetters('auth', ['userId', 'userInitials', 'userProfilePicture']),

    avatarImage() {
      return this.userProfilePicture('600x600');
    },

    isFileValid() {
      if (this.imageFile) {
        return this.imageFile.type.startsWith('image/');
      } else {
        return null;
      }
    },
  },

  methods: {
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['updateUserAccount']),

    async updateUser(e) {
      this.setLoading(true);
      e.preventDefault();
      const profile_picture = this.imageFile ? await this.uploadFileToS3(this.imageFile) : null;
      // clear any null or undefined variables before update
      this.updateUserAccount({ data: { profile_picture } })
        // .then((res) => {
        //   console.log(res);
        // })
        .catch((err) => {
          console.error('Error updating user.', err);
        })
        .finally(() => {
          this.setLoading(false);
        });
    },

    async uploadFileToS3(file) {
      const userId = this.userId;
      const dateString = new Date().toISOString();
      const fileName = `profile-picture_${userId}_${dateString}`;
      const fileTypeSuffix = '.' + file.type.split('/')[1];
      const fileKey = 'users/' + fileName + fileTypeSuffix;
      try {
        const data = await s3
          .upload({
            Bucket: bucketName,
            Key: fileKey,
            Body: file,
            ACL: 'public-read',
            ContentType: file.type,
          })
          .promise();
        return data.key;
      } catch (err) {
        console.error('Error uploading to s3.', err.message);
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  height: 300px;
  margin-bottom: 20px;
  object-fit: cover;
  width: 300px;
}
</style>
