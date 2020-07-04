<template>
  <div>
    <h2>User Settings</h2>
    <b-form novalidate @submit="updateUser">
      <b-form-group label="Profile Picture" label-for="profile-picture">
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
      <b-button type="submit" variant="primary">Save Changes</b-button>
    </b-form>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import s3, { bucketName, bucketRegion } from '@/helpers/init-aws';
import { mapActions } from 'vuex';
export default {
  name: 'UserSettings',

  data() {
    return {
      imageFile: null,
      photos: [],
    };
  },

  computed: {
    isFileValid() {
      if (this.imageFile) {
        return this.imageFile.type.startsWith('image/');
      } else {
        return null;
      }
    },
  },

  mounted() {
    this.getAllBucketObjects();
  },

  methods: {
    ...mapActions('app', ['setLoading']),

    getAllBucketObjects() {
      s3.listObjects({ Delimiter: '/' })
        .promise()
        .then((data) => {
          const bucketUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`;
          this.photos = data.Contents.map((photo) => {
            const photoKey = photo.Key;
            const photoUrl = bucketUrl + encodeURIComponent(photoKey);
            return photoUrl;
          });
        })
        .catch((err) => {
          console.error('Error fetching s3 objects.', err.message);
        });
    },

    updateUser(e) {
      e.preventDefault();
      if (this.imageFile) {
        this.uploadFileToS3(this.imageFile);
      }
    },

    uploadFileToS3(file) {
      this.setLoading(true);
      const userId = '3508137583';
      const fileName = `profile-picture_${userId}`;
      const fileTypeSuffix = '.' + file.type.split('/')[1];
      const fileKey = 'users/' + fileName + fileTypeSuffix;
      console.log(fileTypeSuffix);
      new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucketName,
          Key: fileKey,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type,
        },
      })
        .promise()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error('Error uploading to s3.', err.message);
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
};
</script>

<style></style>
