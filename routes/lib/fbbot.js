var token = require('./bot_oil.js').token;
var request = require('request');

exports.sendTextMessage = function sendTextMessage(sender, text) {
	messageData = {
		text:text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

exports.sendGenericMessage = function sendGenericMessage(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "你想聽什麼種類的笑話呢？",
					"subtitle": "請選擇！",
					"buttons": [{
						"type": "postback",
						"title": "圖片",
						"payload": 'IMAGE'
					}, {
						"type": "postback",
						"title": "文字",
						"payload": "TEXT",
					}],
				}]
			}
		}
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}


exports.sendGagMessage = function sendGenericMessage(sender, res) {
 
	var gagData = res.map(function(item) {
		return {
			title: item.title,
			image_url: item.image,
			buttons: [{
				type: "web_url",
				url: item.url,
				title: "web url"
			}]
		};
	});
	
	var Result = [];
	for (var i = 0; i < 3; i++) {
	  Result.push(gagData[Math.floor(Math.random()*10)]);
	}


	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": Result 
			}
		}
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}
