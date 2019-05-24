import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {
  constructor() {}

  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: 'AKIA6QIHZLDWLRFXGKFY',
      secretAccessKey: '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',
      region: 'ap-northeast-2'
    });
    const params = {
      Bucket: 'pammonthlyrecord',
      Key: 'pam' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.upload(params, function(err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    // //for upload progress
    return bucket.upload(params);
    // .upload(params, data => {
    //   console.log(data);
    // })
    // .on('httpUploadProgress', function(evt) {
    //   // console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
    // })
    // .send(function(err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return data;
    // });
  }
}
