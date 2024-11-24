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
