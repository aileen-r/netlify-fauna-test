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
          <b-form-group label="First Name" label-for="first-name">
            <b-form-input
              id="first-name"
              v-model.trim="$v.form.firstName.$model"
              :state="getFieldState('firstName')"
              type="text"
              placeholder="John"
            />
          </b-form-group>
          <b-form-group label="Surname" label-for="surname">
            <b-form-input
              id="surname"
              v-model.trim="$v.form.surname.$model"
              :state="getFieldState('surname')"
              type="text"
              placeholder="Boyega"
            />
          </b-form-group>
          <b-form-group
            label="Email address"
            label-for="email"
            description="You'll need to verify your new email address when you change this."
          >
            <b-form-input
              id="email"
              v-model.trim="$v.form.email.$model"
              :state="getFieldState('email')"
              type="email"
              placeholder="your-name@site.com"
            />
            <b-form-invalid-feedback :state="getFieldState('email')">
              {{ 'Please enter a valid email address' }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Password"
            description="We will send you an email with a link to reset your password."
          >
            <b-button variant="secondary">Reset your password</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Save Changes</b-button>
    </b-form>
  </div>
</template>

<script>
import s3, { bucketName } from '@/helpers/init-aws';
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { email } from 'vuelidate/lib/validators';

import formMixin from '@/mixins/formMixin';

export default {
  name: 'UserSettings',

  mixins: [validationMixin, formMixin],

  data() {
    return {
      form: {
        firstName: '',
        surname: '',
        email: '',
      },
      imageFile: null,
    };
  },

  validations: {
    form: {
      firstName: {},
      surname: {},
      email: {
        email,
      },
    },
  },

  computed: {
    ...mapGetters('auth', ['currentUser', 'userId', 'userInitials', 'userProfilePicture']),

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

  mounted() {
    this.form = {
      firstName: this.currentUser.user_metadata.first_name,
      surname: this.currentUser.user_metadata.surname,
      email: this.currentUser.email,
    };
  },

  methods: {
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['updateUserAccount']),

    async updateUser(e) {
      this.setLoading(true);
      e.preventDefault();
      const profile_picture = this.imageFile ? await this.uploadFileToS3(this.imageFile) : null;
      const user = { data: {} };
      if (this.currentUser.user_metadata.first_name !== this.form.firstName) {
        user.data.first_name = this.form.firstName;
      }
      if (this.currentUser.user_metadata.surname !== this.form.surname) {
        user.data.surname = this.form.surname;
      }
      if (profile_picture) user.data.profile_picture = profile_picture;
      if (this.currentUser.email !== this.form.email) {
        user.email = email;
      }
      if (!user.email && Object.keys(user.data).length === 0) {
        this.setLoading(false);
        return;
      }
      this.updateUserAccount(user)
        .then(() => {
          this.imageFile = null;
        })
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
