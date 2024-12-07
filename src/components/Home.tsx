import './Home.css';  // Stílus importálása

const Home = () => {
  // Lekérjük a mentett JWT response-t a localStorage-ból
  const savedData = localStorage.getItem('jwt-response');
  const parsedData = savedData ? JSON.parse(savedData) : null;

  const username = parsedData ? parsedData.username : 'Guest';

  return (
    <div id="home-container">
      <h1 id='welcome-message'>Welcome to Storage Monitor, {username}!</h1>
      <div id='about-us-container'>
        <br />
        <br />
        <img src="https://images.playground.com/a1385660573844b1a423dac1d80ac125.jpeg" alt="about-us" id='about-us-image' />
        <span id='about-us-text'><b>Storage Monitor</b> is a web application that allows you to monitor your storage usage by providing real-time data and insights. Monitoribg was difficult in the past, but now it's easy. You can keep track of your items in your storages, create and use itemtypes to filter the items. You can also simulate the production of products and see if you have enough stock to make them. <br />
          <br />
          "Some people save appliance boxes because they think they will get more money for the items if they ever sell them. But if you consider the rent you pay, turning your space into a storage shed for empty boxes, that probably costs you more than you would earn selling an appliance in a box."
          <br />
          <br />
          <br />
          -Marie Kōndo-
          <br />
          <br />
        </span>
      </div>
      <p>© Storage Monitor, Inc. All rights reserved.</p>
    </div>
  );
};

export default Home;
