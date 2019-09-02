function getJsonService() {
  return {
    name: 'testService',
    url: 'http://localhost',
    healthyValue: { status: "Alive and kicking" },
    type: 'json',
    responseTimes: []
  }
}

function getHtmlService() {
  return {
    name: 'htmlService',
      url: 'http://localhost',
      healthyValue: '', // No need for healthy value for html pages
      type: 'html',
      responseTimes: []
  }
}

function getTextService() {
  return {
    name: 'textService',
    url: 'http://localhost',
    healthyValue: '200 OK',
    type: 'text',
    responseTimes: []
  }
}

module.exports = {
  getJsonService,
  getHtmlService,
  getTextService
}