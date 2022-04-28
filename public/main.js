// eslint-disable-next-line no-undef
const socket = io()

const messagesElem = document.getElementById('messages')
const messageInput = document.getElementById('message')

// eslint-disable-next-line no-unused-vars
function onSubmit (event) {
  event.preventDefault()

  messagesElem.innerHTML += '<tr><td>' + messageInput.value + '</td></tr>'
  socket.emit('message', messageInput.value)
  messageInput.value = ''
}

socket.on('message', function (data) {
  messagesElem.innerHTML += '<tr><td>' + data.message + '</td></tr>'
})
