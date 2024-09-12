import React, { useRef, useState, useEffect, useCallback } from 'react';

const ImagePosterApp = () => {
  const canvasRef = useRef(null);
  const [posterImage, setPosterImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  // const [name, setName] = useState(""); // State for storing the name separately
  const [extraText, setExtraText] = useState(""); // State for the extra text on the poster

  useEffect(() => {
    const poster = new Image();
    poster.src = `${process.env.PUBLIC_URL}/poster.png`; // Path to your poster image
    poster.onload = () => {
      setPosterImage(poster);
    };
  }, []);

  const drawPosterImage = useCallback(() => {
    if (posterImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(posterImage, 0, 0, canvas.width, canvas.height);

      // Add extra text on top of the poster image
      if (extraText) {
        ctx.font = "bold 30px Arial"; // Font style for the extra text
        ctx.fillStyle = "white"; // Text color
        ctx.textAlign = "center"; // Align text to the left
        ctx.fillText(extraText, 201, 1230); // Adjust x, y coordinates for positioning
      }
    }
  }, [posterImage, extraText]);

  useEffect(() => {
    drawPosterImage();
  }, [posterImage, extraText, drawPosterImage]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setUploadedImage(img);
        drawUploadedImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const drawUploadedImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    drawPosterImage(); // Draw poster with extra text first

    const x = 76; // X-coordinate for the image on the poster
    const y = 910; // Y-coordinate for the image on the poster
    const width = 250; // Width of the uploaded image
    const height = 278; // Height of the uploaded image
    const radius = 36; // Corner radius for rounded corners

    // Draw the rounded rectangle with corners clipped
    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Clip to the rounded rectangle and draw the image inside it
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.clip();
    ctx.drawImage(img, x, y, width, height);

    // Add the name separately below the image
    // drawNameBelowImage(ctx, x, y + height + 50); // Adjust the position to draw the name
  };

  // const drawNameBelowImage = (ctx, x, y) => {
  //   ctx.font = "30px Arial"; // Font size and style for the name
  //   ctx.fillStyle = "black"; // Color of the text
  //   ctx.textAlign = "center"; // Center the text horizontally
  //   ctx.fillText(name, canvasRef.current.width / 2, y); // Draw the name at the bottom of the image
  // };

  const handleDownload = () => {
    if (!uploadedImage) {
      alert('Image not uploaded')
    }
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'poster-with-text-and-name.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/logo512.png`} width='40px' height='40px' />
        <h1 style={{ marginLeft: '10px' }}>Poster Maker</h1>
      </div>


      <div>

        <p>Enter your name</p>
        <input

          type="text"
          placeholder="Enter Name"
          value={extraText}
          onChange={(e) => setExtraText(e.target.value)}
          style={{
            marginBottom: '10px ',
            padding: '10px',
          }}
        />
      </div>

      <div>
        <p>Enter your name</p>
        <input type="file" onChange={handleImageUpload} style={{ marginBottom: '10px ' }} />
      </div>

      <button
        onClick={handleDownload}
        style={{
          padding: '10px 30px',
          margin: '20px 0',
          color: 'white',
          background: 'green',
          border: 0,

        }} >Download Poster</button>

      <h3>Preview Poster</h3>
      <div style={{ position: 'relative', width: '500px', height: '700px', border: '1px solid #ccc', marginBottom: '10px' }}>
        <canvas ref={canvasRef} width={865} height={1280} />
      </div>

    </div>
  );
};

export default ImagePosterApp;


// import React, { useRef, useState, useEffect } from 'react';

// const ImagePosterApp = () => {
//   const canvasRef = useRef(null);
//   const [posterImage, setPosterImage] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [imageName, setImageName] = useState(''); // State for storing the name to be added below the image
//   const [extraText, setExtraText] = useState(""); // State for the extra text at the top corner

//   // Load the poster when component mounts
//   useEffect(() => {
//     const poster = new Image();
//     poster.src = `${process.env.PUBLIC_URL}/mainbg.png`; // Your poster image URL
//     poster.onload = () => {
//       setPosterImage(poster);
//     };
//   }, []);

//   useEffect(() => {
//     if (posterImage && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(posterImage, 0, 0, canvas.width, canvas.height);
//     }
//   }, [posterImage]);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;
//       img.onload = () => {
//         setUploadedImage(img);
//         drawUploadedImage(img);
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const drawUploadedImage = (img) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Define the area where the uploaded image will be placed
//     const x = 76;
//     const y = 910;
//     const width = 250;
//     const height = 281;
//     const radius = 20;

//     const drawRoundedRect = (ctx, x, y, width, height, radius) => {
//       ctx.beginPath();
//       ctx.moveTo(x + radius, y);
//       ctx.lineTo(x + width - radius, y);
//       ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
//       ctx.lineTo(x + width, y + height - radius);
//       ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//       ctx.lineTo(x + radius, y + height);
//       ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
//       ctx.lineTo(x, y + radius);
//       ctx.quadraticCurveTo(x, y, x + radius, y);
//       ctx.closePath();
//     };

//     // Clear the area
//     ctx.clearRect(x, y, width, height);

//     // Redraw the poster
//     if (posterImage) {
//       ctx.drawImage(posterImage, 0, 0, canvas.width, canvas.height);
//     }

//     // Draw the rounded rectangle and clip
//     drawRoundedRect(ctx, x, y, width, height, radius);
//     ctx.clip(); // Clip to the rounded rectangle

//     // Draw the image inside the clipped area
//     ctx.drawImage(img, x, y, width, height);

//     if (imageName) {
//       ctx.font = '100px Arial';
//       ctx.fillStyle = 'black'; // Text color
//       ctx.textAlign = 'center';
//       ctx.fillText(imageName, x + width / 2, y + height + 30); // Text below the image
//     }

//     // Draw the extra text at the top corner
//     // drawExtraTextAtTopCorner(ctx, 20, 50); // Adjust the position for the top corner text

//     // Add extra text on top of the poster image
//     if (extraText) {
//       ctx.font = "100px Arial"; // Font style for the extra text
//       ctx.fillStyle = "white"; // Text color
//       ctx.textAlign = "left"; // Align text to the left
//       ctx.fillText(extraText, x + width / 2, y + height + 30); // Adjust x, y coordinates for positioning
//     }

//   };

//   // const drawExtraTextAtTopCorner = (ctx, x, y) => {
//   //   ctx.font = " 24px Arial"; // Font size and style for the extra text
//   //   ctx.fillStyle = "red"; // Color of the extra text
//   //   ctx.fillText(extraText, x, y); // Draw the extra text in the top-left corner
//   // };


//   const handleDownload = () => {
//     const canvas = canvasRef.current;
//     const link = document.createElement('a');
//     link.download = 'poster-with-image.png';
//     link.href = canvas.toDataURL();
//     link.click();
//   };

//   const handleNameChange = (event) => {
//     const newName = event.target.value;
//     setImageName(newName);

//     // Redraw the canvas to update the name text
//     if (uploadedImage) {
//       drawUploadedImage(uploadedImage);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload and Add Image to Poster</h1>
//       <input type="file" onChange={handleImageUpload} />
//       <input
//         type="text"
//         placeholder="Enter extra text for top corner"
//         value={extraText}
//         onChange={(e) => setExtraText(e.target.value)}
//         style={{ margin: '10px 0' }}
//       />

//       <input
//         type="text"
//         placeholder="Enter name..."
//         value={imageName}
//         onChange={handleNameChange}
//         style={{ marginTop: '10px' }}
//       />
//       <button onClick={handleDownload}>Download Poster</button>
//       <div style={{ position: 'relative', width: '500px', height: '700px', border: '1px solid #ccc', marginBottom: '10px' }}>
//         <canvas ref={canvasRef} width={865} height={1280} />
//       </div>


//     </div>
//   );
// };

// export default ImagePosterApp;
