import React from 'react';
import './dogdetails.css';

const DogDetails = () => {
  const dogBreeds = [
    { id: 1, name: 'โกลเด้น รีทรีฟเวอร์' },
    { id: 2, name: 'ร็อตไวเลอร์' },
    { id: 3, name: 'คอลลี่' },
    { id: 4, name: 'แจ็ครัสเซลล์' },
    { id: 5, name: 'ชเนาเซอร์' },
    { id: 6, name: 'ชิวาวา' },
    { id: 7, name: 'ชิสุ' },
    { id: 8, name: 'ไซบีเรียน ฮัสกี้' },
  ];

  return (
    <div className="admin-container">
     
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="user-avatar.png" alt="User Avatar" />
          <h3>Natcha@gmail.com</h3>
        </div>
        <ul className="sidebar-menu">
          <li><a href="#"><img src="icon-home.png" alt="icon" /> ภาพรวม</a></li>
          <li><a href="#"><img src="icon-details.png" alt="icon" /> รายละเอียดพันธุ์สุนัข</a></li>
          <li><a href="#"><img src="icon-care.png" alt="icon" /> การเลี้ยงสุนัข</a></li>
          <li><a href="#"><img src="icon-location.png" alt="icon" /> แหล่งซื้อสุนัข</a></li>
          <li><a href="#"><img src="icon-breeding.png" alt="icon" /> การผสมพันธุ์สุนัข</a></li>
          <li><a href="#"><img src="icon-users.png" alt="icon" /> ผู้ใช้งาน</a></li>
        </ul>
        <button className="logout-btn">ออกจากระบบ</button>
      </div>

      {/* Content */}
      <div className="content">
        <div className="content-header">
          <h1>รายละเอียดพันธุ์สุนัข</h1>
          <button className="add-button">+ เพิ่มพันธุ์สุนัข</button>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อพันธุ์สุนัข</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {dogBreeds.map((breed, index) => (
                <tr key={breed.id}>
                  <td>{index + 1}</td>
                  <td>{breed.name}</td>
                  <td><button className="action-button edit-button">แก้ไข</button></td>
                  <td><button className="action-button delete-button">ลบ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
