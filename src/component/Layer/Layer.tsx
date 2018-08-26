import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import Module from '../Module';
import { IModuleData, HotspotInfo, IContext } from '../interface';


interface LayerProps {
    moduleData: IModuleData;
}

interface LayerState {

}

const rootEl = document.createElement('div');
rootEl.classList.add('d-layer');

export default class Layer extends React.Component<LayerProps, LayerState> {


    constructor(props: LayerProps) {
        super(props);
    }

    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    componentDidMount() {
        if (this.context.BASE_DATA.pageType === 0) {
            document.body.appendChild(rootEl);

            // 阻止滚动穿透
            (document as any).querySelector('html').style.overflow = 'hidden';
        }
    }

    componentWillUnmount() {
        this.closeModal();
    }

    onClose = () => {
        this.closeModal();
    }

    closeModal = () => {
        rootEl.remove();
        // 滚动穿透还原
        (document as any).querySelector('html').style.overflow = 'initial';
    }

    renderChild = () => {

        let {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                },
            },
        } = this.props;

        return (
            <React.Fragment>
                <div className="d-img">
                    <img src={imgUrl} />
                    <Icon type="close" />
                    <div className="d-hotspots-wrap">
                        {hotspots && hotspots.map((v: HotspotInfo) => {
                            <a href={v.url}></a>
                        })}
                    </div>

                </div>
                <div className="d-mask" onClick={this.onClose}></div>
            </React.Fragment>
        )
    }

    render() {
        const { moduleData } = this.props;
        const { pageType } = this.context.BASE_DATA;

        // 装修时的展示
        if (pageType === 0) {
            return (
                <Module moduleData={moduleData}>
                    <span className="d-hint">浮层模块效果请在预览页中查看</span>
                </Module>
            );
        } else {
            return ReactDOM.createPortal(
                this.renderChild(),
                rootEl,
            );
        }

    }
}