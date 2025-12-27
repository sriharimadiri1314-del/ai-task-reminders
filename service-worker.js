function triggerNotification(message) {
    if (!("Notification" in window)) {
        alert("Browser does not support notifications");
        return;
    }

    if (Notification.permission === "granted") {
        new Notification("⏰ AI Task Reminder", {
            body: message,
            icon: "https://cdn-icons-png.flaticon.com/512/1792/1792931.png",
            badge: "https://cdn-icons-png.flaticon.com/512/1792/1792931.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                triggerNotification(message);
            }
        });
    }
}
function scheduleNotification(task, time) {
    const delay = new Date(time).getTime() - Date.now();

    if (delay <= 0) return;

    setTimeout(() => {
        triggerNotification(task);
    }, delay);
}
self.addEventListener("push", function(event) {
    const data = event.data ? event.data.text() : "AI Task Reminder";

    event.waitUntil(
        self.registration.showNotification("⏰ Reminder", {
            body: data,
            icon: "icon.png"
        })
    );
});

