window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionPosition < windowHeight - 100) {
      section.classList.add('animate');
    } else {
      section.classList.remove('animate');
    }
  });
});

function initClient() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY', // Replace with your API key
      clientId: 'YOUR_CLIENT_ID', // Replace with your Client ID
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar', // Or 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(() => {
      console.log('Client initialized!');
    }, (error) => {
      console.error('Error initializing client:', error);
    });
  });
}

function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    console.log('User signed in!');
    listEvents(); // Call your function to list calendar events here
  });
}

function handleSignOutClick() {
  gapi.auth2.getAuthInstance().signOut().then(() => {
    console.log('User signed out.');
  });
}

function listEvents() {
  gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime',
  }).then((response) => {
    const events = response.result.items;
    if (events.length > 0) {
      events.forEach((event) => {
        const when = event.start.dateTime || event.start.date;
        console.log(`${event.summary} (${when})`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}
