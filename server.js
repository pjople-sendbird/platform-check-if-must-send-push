const axios = require('axios');

const APP_ID = 'YOUR APPLICATION ID HERE';
const PLATFORM_API_TOKEN = 'YOUR API TOKEN HERE';

const pendingPush = [];

function getMyUsers(callback) {
    sendRequest('users/?limit=50', (result) => {
        const users = result.users;
        getUserChannels(users, 0, () => {
            callback(true);
        })    
    })
}

function getUserChannels(users, index, callback) {
    if (!users || index >= users.length) {
        callback(true);
    } else {
        const user = users[ index ];
        checkIfPushNeeded(user, (success, sendPushToMessages) => {
            if (success) {
                pendingPush.push(...sendPushToMessages);
                index ++;
                getUserChannels(users, index, callback);
            } else {
                callback(false);
            }
        })
    }
}

function checkIfPushNeeded(user, callback) {
    const userId = user.user_id;
    console.log('Checking user ' + userId);
    sendRequest('users/' + userId + '/my_group_channels', (result) => {
        const sendPushToMessages = [];
        const channels = result.channels;
        if (channels && channels.length > 0) {
            for (let channel of channels) {
                if (channel.last_message) {
                    const userLastRead = channel.user_last_read;
                    const messageCreatedAt = channel.last_message.created_at;
                    if (userLastRead < messageCreatedAt) {
                        sendPushToMessages.push({
                            userId: userId,
                            channelLastRead: new Date( userLastRead ),
                            lastMessageCreatedAt: new Date( messageCreatedAt ),
                            lastMessage: channel.last_message 
                        });
                    }
                }
            }
        } 
        callback(true, sendPushToMessages);
    })
}

function sendRequest(url, callback) {
    axios.get( 'https://api-' + APP_ID + '.sendbird.com/v3/' + url, {
        headers: {
            'Api-Token': PLATFORM_API_TOKEN
        }
    }).then(resp => {
        callback(resp.data);
    });
}

getMyUsers((success) => {
    console.log( success ? 'JOB ENDED' : 'JOB ENDED WITH ERRORS');
    console.log('Messages pending to send messages to: ', pendingPush);
});

