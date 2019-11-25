import React from 'react'
import Link from 'next/link'

function Tool({ toolName, toolImage, toolButton, link }) {
  const st = "/static/images/";
  const images = [
    { id: 0, img: st + 'See.png' },
    { id: 1, img: st + 'Create.png' },
    { id: 3, img: st + 'Lab.png' },
    { id: 4, img: st + 'Locations.png' },
    { id: 5, img: st + 'Mother.png' },
    { id: 6, img: st + 'Refresh.png' },
    { id: 7, img: st + 'Batch.png' },
    { id:8, img: st + 'Profile.png' },
  ];
  const image = images.find(image => image.id == toolImage);
  const _link = !link ? '/dashboard' : `/${link}`;

  return (
    <div className="tool">      
        <h3 className="tool-name">
          {toolName}
        </h3>
        <Link href={_link}>
          <img 
            className="tool-image" 
            src={image.img}
          />
        </Link>
        <Link href={_link}>
          <div className="tool-button">
            {toolButton == 'v' ? 'VIEW' : 'CREATE'}
          </div>
        </Link>
      <style jsx>{`
       .tool {
          margin: 5px;
          width: 33.3333%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tool-name {
          font-size: 25px;
          margin-left: 15px;
          font-weight: 400;
        }
        .tool-image {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
        .tool-button {
          width: 70px;
          height: 20px;
          padding-top: 5px;
          color: rgb(71, 137, 120);
          border: 1px rgb(71, 137, 120) solid;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
        }

        @media only screen and (max-width: 600px) {
          .tool-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Tool;