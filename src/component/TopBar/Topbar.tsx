import React from 'react';
import { Icon } from 'antd';
import Cookies from 'js-cookie';

interface TopbarProps {
    hasPreview?: boolean;
    hasPublish?: boolean;
}

interface TopbarState {
}

const { BASE_DATA } = (window as any);
const { pageId, username } = BASE_DATA;

class Topbar extends React.Component<TopbarProps, TopbarState> {

    static defaultProps: TopbarProps = {
        hasPreview: true,
        hasPublish: true,
    }

    constructor(props: TopbarProps) {
        super(props);
    }

    preview = () => {
        (document.querySelector('.J_previewWrap') as any).classList.add('active');
        (document.querySelector('.J_previewContainer') as any).innerHTML = `
		<iframe class="cd-canvas J_canvas" src="/page/preview.html?pageId=${pageId}">                
		</iframe>`;
    }

    logout = () => {
        Cookies.remove('pin');
        location.href = '/api/page/login';
    }

    render() {
        const { hasPreview, hasPublish } = this.props;
        return (
            <div className="d-top-bar">
                <div className="d-left">
                    <div className="d-logo">
                        <img src="//naeditor-image.oss-cn-shenzhen.aliyuncs.com/timg.jpg?x-oss-process=image/resize,w_30" />
                    </div>
                    <h2>NaEditor</h2>
                </div>
                <div className="d-right">

                    {hasPreview &&
                        <React.Fragment>
                            <div className="d-line"></div>
                            <div
                                className="J_preview d-preview"
                                onClick={this.preview}
                            >预览</div>
                        </React.Fragment>
                    }
                    {hasPublish &&
                        <React.Fragment>
                            <div className="d-line"></div>
                            <div className="J_publish d-publish">发布</div>
                        </React.Fragment>
                    }
                    <div className="d-line"></div>
                    <div className="d-username">
                        <span>{username}</span>
                        <Icon type="logout" onClick={this.logout} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Topbar;
