import React from "react";
export default class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };

    }

    render() {

        return (
            <>
                <section id="about" className="about-section pt-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="about-img mb-50">
                                    <img src="assets/img/about/about-img.svg" alt="about" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-content mb-50">
                                    <div className="section-title mb-50">
                                        <h1 className="mb-25">Đại lý chữ ký số của chúng tôi</h1>
                                        <p>Đáp ứng thông tư 06/2015/TT-BTTTT của bộ Thông tin và Truyền thông, yêu cầu các nhà cung cấp dịch vụ chứng thực chữ ký số nâng cấp hệ thống bảo mật lên tối thiểu mức level 3 nhằm đáp ứng nhu cầu kết nối để sử dụng các dịch vụ công.</p>
                                    </div>
                                    <div className="accordion pb-15" id="accordionExample">
                                        <div className="single-faq">
                                            <button className="w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Dịch vụ nào chúng tôi cung cấp?
              </button>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="faq-content">
                                                    Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật, An Toàn Và Tinh Tế.
                </div>
                                            </div>
                                        </div>
                                        <div className="single-faq">
                                            <button className="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Thủ tục đăng ký bao gồm những gì?
              </button>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="faq-content">
                                                    Gửi Thông Tin Cá Nhân Của Bạn Bao Gồm: Thẻ Căn Cước Công Dân Hoặc Hộ Chiếu Qua Zalo Hoặc Email Cho Chúng Tôi. Chúng Tôi Sẽ Phản Hồi Thông Tin Hướng Dẫn Giúp Bạn Tạo Được Chữ Ký Điện Tử Dễ Dàng Hơn.
                                                    Hoặc Bạn Có Thể Tạo Tài Khoản Ngay Trên WebSite Digital Signature Này Và Sau Đó Đợi Tài Khoản Của Bạn Được Xét Duyệt, Bạn Đã Có Thể Sử Dụng Tài Khoản Của Mình Để Tạo Chữ Ký Điện Tử.
                </div>
                                            </div>
                                        </div>
                                        <div className="single-faq">
                                            <button className="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Sử Dụng Chữ Ký Điện Tử Mà Bạn Đã Tạo?
              </button>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="faq-content">
                                                    Bạn Có Thể Sử Dụng Chữ Ký Ngay Sau Khi Tạo Thành Công Chữ Ký Điện Tử Trên WebSite Digital Signature.
                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a onClick={(e) => { e.preventDefault() }} className="main-btn btn-hover">Xem Thêm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}