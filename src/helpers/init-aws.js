import AWS from 'aws-sdk';

const albumBucketName = '52-week-savings-challenge';
const bucketRegion = 'eu-west-2';
const IdentityPoolId = 'eu-west-2:cb5d7d30-e98a-4c4f-9bad-a9a55e78a976';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
});
