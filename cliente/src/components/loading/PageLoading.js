import React from 'react';
import Logo from '../../assets/images/logoConidaC.svg';

const PageLoading = () => {
    return (
        <>

            <div className="loading-scr">
                <div className="loading-animation">
                    <img src={Logo} className="image-logo-loading" alt="Linkedin logo" />
                        <div class="load-bar"></div>
                </div>
            </div>

        </>
    );
};

export default PageLoading;