const changelog = [
    {
        ver: "1.3.1",
        topic: "Minor bugfix",
        change: [
            {
                fix: true,
                header: "Fixed when typing invalid filename in URL (<code>create.html?project=testing&file=no</code>) will give error in log and show blank screen",
                why: `Rerouting to <code>mcmeta</code> and giving an error to the user via the notification system.`
            },
            {
                fix: false,
                header: `Made generators more futureproof (dropdown now contains information about the create version, not only minecraft version)`,
                why: `If versions like 1.21.1 get multiple updates that change the way recipes are handled.`
            },
            {
                fix: false,
                header: `Added JSON changelog system for automatic format generation`,
                why: `So it's easier to format the HTML.`
            }
        ]
    },
    {
        ver: "1.3.0",
        topic: "The UI Update",
        change: [
            {
                fix: false,
                header: "Made new-file (+) have a nicer UI instead of using <code>prompt</code>",
                why: `This is for a better user-experience and nicer UI.`
            },
            {
                fix: false,
                header: `Added notifications
    <button onclick="ShowTest()">Example Notification (swipe)</button>
    <button onclick="ShowTest(true)">Example Notification (fades)</button>
    to let the user know what happened without big UI beeing in the way`,
                why: `For cleaner UI design and a notification system on errors & warnings.<br>
                This also has effect on <code>"warn"</code> and <code>"error"</code> log messages, once DEV mode is disabled.`
            }
        ]
    },
    {
        ver: "1.2.5",
        topic: "Hotfix",
        change: [
            {
                fix: false,
                header: "Removed legacy code",
                why: `So the browser does not need to load that many JS-Files</label><br><br>
    <li>Exporting JSON works correctly now.`
            },
            {
                fix: true,
                header: "Exporting JSON works correctly now",
                why: `Changed the return value of the generators to be string -
                forgot in the <code>Generator update</code>.`
            }
        ]
    },
    {
        ver: "1.2.0",
        topic: "The Generator update",
        change: [
            {
                fix: false,
                header: "Added generators (<code>create-1_20_1-6_0_6</code>, <code>create-1_21_1-6_0_6</code>)",
                why: `This makes development easier in the future, especially when being able to enable/disable certain
    generators without loading every single one.`
            },
            {
                fix: false,
                header: "Marked old Generator (<code>JSONify</code>) (now deprecated and in <code>legacy/JSONify.js</code>)",
                why: `Because of old code that will be harder to upgrade with minecraft and create versions,
                as generators are easier to develop as well.`
            },
            {
                fix: false,
                header: "Added changelog",
                why: `For easier tracking of changes you might have missed.`
            }
        ]
    }
];
