<template>
  <h2>User Settings</h2>
</template>

<script>
import s3, { bucketName, bucketRegion } from '@/helpers/init-aws';
export default {
  name: 'UserSettings',
  data() {
    return {
      photos: [],
    };
  },

  mounted() {
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
};
</script>

<style></style>
