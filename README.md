# Platform API - Check if must send push

Example on how to check periodically for pending push notifications

The idea is to get when the last message was sent and compare with the last time a user read the channel.

## Change the values

Replace with your own values here:
```
const APP_ID = 'YOUR APPLICATION ID HERE';
const PLATFORM_API_TOKEN = 'YOUR API TOKEN HERE';
```

And this sample gets 50 users. You must implement a different logic for getting more users.
The limit for max amount of users per page is 100. Use ```next``` to get the next ones.

```
function getMyUsers(callback) {
    sendRequest('users/?limit=50', (result) => {
       ...
    })
 }
```

## Response

This is the response you finally will get:

```
[{
    userId: 'walter1',
    channelLastRead: 2021-12-06T12:59:05.070Z,
    lastMessageCreatedAt: 2021-12-21T11:25:32.070Z,
    lastMessage: {
      message_survival_seconds: -1,
      custom_type: '',
      mentioned_users: [],
      translations: {},
      updated_at: 0,
      is_op_msg: false,
      is_removed: false,
      user: [Object],
      file: {},
      message: 'reply to this',
      data: '',
      message_retention_hour: -1,
      silent: false,
      parent_message_id: 1493486565,
      type: 'MESG',
      created_at: 1640085932070,
      channel_type: 'group',
      root_message_id: 1493486565,
      req_id: '1640085923376',
      mention_type: 'users',
      channel_url: 'channel2',
      message_id: 1493776295
    }
}]
```

As you can see from the list, ```channelLastRead``` was on ```2021-12-06 at 12:59:05``` and the last message to the channel was sent on ```2021-12-21 11:25:32```
This means that this channel has unread messages for this user. You need to send a message to user ID ```walter1```
