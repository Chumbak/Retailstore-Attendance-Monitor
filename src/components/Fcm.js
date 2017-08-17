/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-06-08T13:09:50+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Fcm.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T17:40:48+05:30
 * @Copyright: Chumbak design Pvt ltd
 */

import FCM, { FCMEvent,
              NotificationType,
              WillPresentNotificationResult,
              RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';


const attendanceappNotif = function (dispatch) {
  console.log(dispatch);
    FCM.requestPermissions();
    FCM.getFCMToken()
       .then(token => {
          //  console.log(token)
       });
    FCM.subscribeToTopic('attendanceapp-notif');

    FCM.on(FCMEvent.Notification, async (notif) => {
        if (Platform.OS === 'ios') {
            switch (notif._notificationType) {
                case NotificationType.Remote:
                //other types available: RemoteNotificationResult.NewData,
                //RemoteNotificationResult.ResultFailed
                    notif.finish(RemoteNotificationResult.NewData);
                    break;
                case NotificationType.NotificationResponse:
                    notif.finish();
                    break;
                case NotificationType.WillPresent:
                //other types available: WillPresentNotificationResult.None
                    notif.finish(WillPresentNotificationResult.All);
                    break;
              }
            }
    });

    FCM.on(FCMEvent.RefreshToken, token => {
        // console.log(token);
    });
};
