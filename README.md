# platform-check-if-must-send-push

Example on how to check periodically for pending push notifications

The idea is to get when the last message was sent and compare with the last time a user read the channel.

## Response

This is the response you finally will get:

```
[{
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
