
import React from "react";
export default class Services extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };

    }


    render() {

        return (
            <>
                <section id="service" className="service-section img-bg pt-100 pb-100 mt-150">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-10">
                                <div className="section-title text-center mb-50">
                                    <h1>Những Dịch Vụ Của Chúng Tôi</h1>
                                    <p> Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật Và An Toàn Theo Giấy Phép GP-BTTTT Do Bộ Thông Tin Và Truyền Thông Cấp.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="single-service">
                                    <div className="icon color-1">
                                        <i className="lni lni-layers" />
                                    </div>
                                    <div className="content">
                                        <h3>Tạo Chữ Ký Điện Tử Cho Cá Nhân</h3>
                                        <p>Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật, An Toàn Và Tinh Tế.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="single-service">
                                    <div className="icon color-2">
                                        <i className="lni lni-code-alt" />
                                    </div>
                                    <div className="content">
                                        <h3>Tạo Chữ Ký Điện Tử Cho Doanh Nghiệp</h3>
                                        <p>Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật, An Toàn Và Tinh Tế.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="single-service">
                                    <div className="icon color-3">
                                        <i className="lni lni-pallet" />
                                    </div>
                                    <div className="content">
                                        <h3>Tạo Chữ Ký Điện Tử Cho Chính Phủ</h3>
                                        <p>Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật, An Toàn Và Tinh Tế.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="single-service">
                                    <div className="icon color-4">
                                        <i className="lni lni-vector" />
                                    </div>
                                    <div className="content">
                                        <h3>Cung Cấp Giải Pháp Chữ Ký Số Đa Dạng</h3>
                                        <p>Cung Cấp Giải Pháp Chữ Ký Điện Tử Bảo Mật, An Toàn Và Tinh Tế.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="view-all-btn text-center pt-30">
                            <a onClick={(e) => { e.preventDefault() }} className="main-btn btn-hover">Xem Tất Cả Các Dịch Vụ</a>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}