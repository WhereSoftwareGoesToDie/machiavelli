
host = Settings.redis_host || "127.0.0.1"
port = Settings.redis_port || 6379
begin
	r = Redis.new(host: host, port: port)
	r.ping
rescue Redis::CannotConnectError => e
	msg = []
	msg << ""
	msg << "***"
	msg << ""
	msg << "Machiavelli Initialization Error"
	msg << ""
	msg << "Redis::CannotConnectError."
	msg << "Check a redis installation exists at #{host}:#{port}"
	msg << ""	
	msg << "***"
	raise msg.join("\n")
end
