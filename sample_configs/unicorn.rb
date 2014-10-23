# Set the working application directory
# working_directory "/path/to/your/app"
working_directory "/path/to/machiavelli"

# Unicorn PID file location
# pid "/path/to/pids/unicorn.pid"
pid "/path/to/machiavelli/tmp/pids/unicorn.pid"

# Path to logs
# stderr_path "/path/to/log/unicorn.log"
# stdout_path "/path/to/log/unicorn.log"
stderr_path "/path/to/machiavelli/log/unicorn.log"
stdout_path "/path/to/machiavelli/log/unicorn.log"

# Unicorn socket
listen "/path/to/machiavelli/tmp/sockets/unicorn.machiavelli.sock"

# Number of processes
# worker_processes 4
worker_processes 2

# Time-out
timeout 30
