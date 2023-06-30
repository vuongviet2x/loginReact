const Home =()=>{
    return(<>
        <div className="home-container">
            <div className="mt-3">
                
                <br/>
                Bạn đang ở trang chủ.
            </div>
            <div>
                Bạn có thể tra cứu các tài liệu nằm trong cụm tủ này.
            </div>
            <ul>
                <li>Để tra cứu tài liệu, bạn click vào Documents </li>
                <li>Để tra cứu lịch sử hoạt động của cụm tủ, bạn click vào History</li>
                <li>Để tra cứu lịch bảo trì của cụm tủ, bạn click vào Maintenance</li>
            
            </ul>
            <div>
                Hướng dẫn tra tài liệu, bạn vào Documents, sử dụng ô tìm kiếm để tra cứu tài liệu theo tên tài liệu.
                Bấm nút " Borrow" để mượn tài liệu.
            </div>
            <div>
                Liên hệ:
                <br/>
                Nguyễn Văn A
            </div>
            {/* <br/>
            <b>Result: </b>
            Thời gian hoàn thành: 1-3 ngày
            <br/>
            GỬi link và link Github tại Email này
            <br/>
            THời gian phản hồi 2 ngày làm việc
            <br/>
            Sử dụng python Django rest framework, tạo các api như trên trang web */}
        </div>
    </>)
}
export default Home;