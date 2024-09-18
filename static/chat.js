let threadId = null;
        let runId = null;

        $('#start-conversation').on('click', function() {
            $.ajax({
                url: '/start',
                method: 'GET',
                success: function(data) {
                    threadId = data.thread_id;
                    $('#chat-log').append('<div>Conversation started. Thread ID: ' + threadId + '</div>');
                    $('#chat-input').prop('disabled', false);
                    $('#send-message').prop('disabled', false);
                    $('#start-conversation').prop('disabled', true);
                },
                error: function(error) {
                    $('#chat-log').append('<div>Error starting conversation.</div>');
                }
            });
        });

        $('#send-message').on('click', function() {
            const message = $('#chat-input').val();
            if (!message) return;

            $.ajax({
                url: '/chat',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ thread_id: threadId, message: message }),
                success: function(data) {
                    runId = data.run_id;
                    $('#chat-log').append('<div><strong>You:</strong> ' + message + '</div>');
                    $('#chat-input').val('');
                    checkRunStatus();
                },
                error: function(error) {
                    $('#chat-log').append('<div>Error sending message.</div>');
                }
            });
        });

        function checkRunStatus() {
            $.ajax({
                url: '/check',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ thread_id: threadId, run_id: runId }),
                success: function(data) {
                    if (data.status === 'completed') {
                        $('#chat-log').append('<div><strong>Assistant:</strong> ' + data.response + '</div>');
                    } else {
                        $('#chat-log').append('<div>Error retrieving response.</div>');
                    }
                },
                error: function(error) {
                    $('#chat-log').append('<div>Error checking run status.</div>');
                }
            });
        }