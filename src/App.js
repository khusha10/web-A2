import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Badge from './badge.svg';
import Teampic from './teampic.svg';
import Button from './button.svg';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/'); // Updated API endpoint
      setLeaderboardData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div className='Main'>
      <h2>LeaderBoard</h2>
      <button onClick={handleButtonClick}>{ <img src={Button} className='butt'/>}</button> {/* Button to fetch data */}
      <table>
        <thead>
          <tr>
            <th>RANK</th>
            <th>TEAM NAME</th>
            <th>TOTAL GAMES PLAYED</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team, index) => (
            <tr key={index}>
              <td>
                {index < 3 ? (
                  <img src={Badge} alt="Badge" className="badge-image" />
                ) : (
                  index + 1
                )}
              </td>
              <td> <img src={Teampic} alt="Teampic here" className="teampic" /> {team.name}</td>
              <td className='ilham'>{team.totalGamesPlayed}</td>
              <td>+{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
