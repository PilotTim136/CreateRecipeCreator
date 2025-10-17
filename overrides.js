const overrides = {
    overrideLogs: !mainCreator.inDev, //NOTE: This will also hide where in the code the log happened. Please turn off while development.
    logs: {
        log: false,
        warn: true,
        error: true
    }
};

if(overrides.overrideLogs){
    const default_log = console.log;
    const default_warn = console.warn;
    const default_error = console.error;

    if(overrides.logs.log)
        console.log = function(message, ...args){
            default_log.apply(console, [message, ...args]);
            UI.Warning.Show(message + args, "ok", true);
        }
    if(overrides.logs.warn)
        console.warn = function(message, ...args){
            default_warn.apply(console, [message, ...args]);
            UI.Warning.Show(message, "warn", true);
        }
    if(overrides.logs.error)
        console.error = function(message, ...args){
            default_error.apply(console, [message, ...args]);
            UI.Warning.Show(message, "err", true);
        }
}
