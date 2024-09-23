// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TOTAL_SEATS = 80;
// const SEATS_PER_ROW = 7;

// const TrainSeatReservation = () => {
//   const [seats, setSeats] = useState([]);
//   const [numSeats, setNumSeats] = useState(1);
//   const [result, setResult] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchSeats();
//   }, []);

//   const fetchSeats = () => {
//     setIsLoading(true);
//     setResult('');
//     // Simulating API call with setTimeout
//     setTimeout(() => {
//       const mockSeats = Array.from({ length: TOTAL_SEATS }, (_, index) => ({
//         seatNumber: index + 1,
//         isBooked: Math.random() < 0.3, // 30% chance of being booked
//       }));
//       setSeats(mockSeats);
//       setIsLoading(false);
//     }, 1000); // Simulate 1 second loading time
//   };

//   const bookSeats = () => {
//     if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
//       setResult('Please enter a valid number of seats (1-7)');
//       return;
//     }

//     setIsLoading(true);
//     // Simulating API call with setTimeout
//     setTimeout(() => {
//       const availableSeats = seats.filter(seat => !seat.isBooked);
//       if (availableSeats.length < numSeats) {
//         setResult('Not enough available seats. Please try a smaller number.');
//         setIsLoading(false);
//         return;
//       }

//       const bookedSeats = availableSeats.slice(0, numSeats).map(seat => seat.seatNumber);
      
//       // Update the seats state to reflect the new bookings
//       setSeats(prevSeats => prevSeats.map(seat => 
//         bookedSeats.includes(seat.seatNumber) ? {...seat, isBooked: true} : seat
//       ));

//       setResult(`Booked seats: ${bookedSeats.join(', ')}`);
//       setIsLoading(false);
//     }, 1000); // Simulate 1 second booking time
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Train Seat Reservation</h1>
//       <div style={{ marginBottom: '16px' }}>
//         <input
//           type="number"
//           min="1"
//           max="7"
//           value={numSeats}
//           onChange={(e) => setNumSeats(parseInt(e.target.value))}
//           style={{ padding: '8px', marginRight: '8px', border: '1px solid #ccc' }}
//         />
//         <button 
//           onClick={bookSeats} 
//           disabled={isLoading}
//           style={{ 
//             backgroundColor: '#3490dc', 
//             color: 'white', 
//             padding: '8px 16px', 
//             border: 'none', 
//             borderRadius: '4px', 
//             cursor: isLoading ? 'not-allowed' : 'pointer',
//             opacity: isLoading ? 0.7 : 1
//           }}
//         >
//           {isLoading ? 'Processing...' : 'Book Seats'}
//         </button>
//       </div>
//       {result && (
//         <div style={{ 
//           backgroundColor: '#e3f2fd', 
//           border: '1px solid #2196f3', 
//           borderRadius: '4px', 
//           padding: '12px', 
//           marginBottom: '16px' 
//         }}>
//           {result}
//         </div>
//       )}
//       {isLoading ? (
//         <div>Loading seat data...</div>
//       ) : (
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: `repeat(${SEATS_PER_ROW}, 1fr)`, 
//           gap: '8px', 
//           marginTop: '16px' 
//         }}>
//           {seats.map((seat) => (
//             <div
//               key={seat.seatNumber}
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: seat.isBooked ? '#f56565' : '#68d391',
//                 color: 'white',
//                 border: '1px solid #e2e8f0',
//               }}
//             >
//               {seat.seatNumber}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrainSeatReservation;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TOTAL_SEATS = 80;
const SEATS_PER_ROW = 7;

const TrainSeatReservation = () => {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = () => {
    setIsLoading(true);
    setResult('');
    // Simulating API call with setTimeout
    setTimeout(() => {
      const mockSeats = Array.from({ length: TOTAL_SEATS }, (_, index) => ({
        seatNumber: index + 1,
        isBooked: Math.random() < 0.3, // 30% chance of being booked
        isSelected: false,
      }));
      setSeats(mockSeats);
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
  };

  // const fetchSeats = () => {
  //   setIsLoading(true);
  //   setResult('');
    
  //   axios.get('http://localhost:5000/api/seats')
  //     .then(response => {
  //       setSeats(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching seats:', error);
  //       setIsLoading(false);
  //     });
  // };
  

  const toggleSeatSelection = (seatNumber) => {
    setSeats(prevSeats =>
      prevSeats.map((seat) =>
        seat.seatNumber === seatNumber
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );

    setSelectedSeats((prevSelectedSeats) => {
      const seatIndex = prevSelectedSeats.indexOf(seatNumber);
      if (seatIndex === -1) {
        return [...prevSelectedSeats, seatNumber];
      } else {
        return prevSelectedSeats.filter((_, index) => index !== seatIndex);
      }
    });
  };

  const bookSeats = () => {
    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      setResult('Please enter a valid number of seats (1-7)');
      return;
    }

    if (selectedSeats.length + numSeats > TOTAL_SEATS) {
      setResult('Not enough available seats. Please select fewer seats or try a different number.');
      return;
    }

    setIsLoading(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      const availableSeats = seats.filter(seat => !seat.isBooked && !seat.isSelected).slice(0, numSeats);
      const bookedSeats = availableSeats.map(seat => seat.seatNumber);

      // Update the seats state to reflect the new bookings
      setSeats(prevSeats => prevSeats.map(seat =>
        bookedSeats.includes(seat.seatNumber)
          ? { ...seat, isBooked: true, isSelected: false }
          : seat
      ));

      setSelectedSeats([]);
      setResult(`Booked seats: ${bookedSeats.join(', ')}`);
      setIsLoading(false);
    }, 1000); // Simulate 1 second booking time
  };
  // const bookSeats = () => {
  //   if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
  //     setResult('Please enter a valid number of seats (1-7)');
  //     return;
  //   }
  
  //   axios.post('http://localhost:5000/api/bookSeats', { seatNumbers: selectedSeats })
  //     .then(response => {
  //       setResult(response.data);
  //       fetchSeats(); // Refresh seat data after booking
  //     })
  //     .catch(error => {
  //       setResult('Error booking seats. Some might be already booked.');
  //       console.error(error);
  //     });
  // };
  

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Train Seat Reservation</h1>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="number"
          min="1"
          max="7"
          value={numSeats}
          onChange={(e) => setNumSeats(parseInt(e.target.value))}
          style={{ padding: '8px', marginRight: '8px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={bookSeats} 
          disabled={isLoading || (selectedSeats.length + numSeats > TOTAL_SEATS)}
          style={{ 
            backgroundColor: '#3490dc', 
            color: 'white', 
            padding: '8px 16px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isLoading || (selectedSeats.length + numSeats > TOTAL_SEATS) ? 'not-allowed' : 'pointer',
            opacity: isLoading || (selectedSeats.length + numSeats > TOTAL_SEATS) ? 0.7 : 1
          }}
        >
          {isLoading ? 'Processing...' : `Book ${numSeats} Seat(s)`}
        </button>
      </div>
      {result && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #2196f3', 
          borderRadius: '4px', 
          padding: '12px', 
          marginBottom: '16px' 
        }}>
          {result}
        </div>
      )}
      {isLoading ? (
        <div>Loading seat data...</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${SEATS_PER_ROW}, 1fr)`, 
          gap: '8px', 
          marginTop: '16px' 
        }}>
          {seats.map((seat) => (
            <div
              key={seat.seatNumber}
              onClick={() => toggleSeatSelection(seat.seatNumber)}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: seat.isBooked
                  ? '#f56565'
                  : seat.isSelected
                    ? '#3b82f6'
                    : '#68d391',
                color: 'white',
                border: '1px solid #e2e8f0',
                cursor: seat.isBooked ? 'not-allowed' : 'pointer',
              }}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainSeatReservation;