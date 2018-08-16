import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';

import Module from '../Module';
import { IModuleData, HotspotInfo } from '../interface';


interface FixedProps {
    moduleData: IModuleData;
}

interface FixedState {

}

const body = document.body;
const pageType = (window as any).BASE_DATA.type;

const rootEl = document.createElement('div');

export default class Fixed extends React.Component<FixedProps, FixedState> {


    constructor(props: FixedProps) {
        super(props);
    }

    componentDidMount() {
        if (pageType !== '0') {
            body.appendChild(rootEl);
        }
    }

    componentWillUnmount() {
        rootEl.remove();
    }

    onClose = () => {
        rootEl.remove();
    }

    renderChild = () => {

        let {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                    vertical,
                    verticalDir,
                    verticalUnit,
                    horizontal,
                    horizontalDir,
                    horizontalUnit,
                    width,
                    widthUnit,
                },
            },
        } = this.props;

        verticalUnit === undefined && (verticalUnit = '%');
        horizontalUnit === undefined && (horizontalUnit = '%');

        let left, right, top, bottom;

        if (verticalDir === 'top') {
            top = `${vertical}${verticalUnit}`;
        } else {
            verticalDir = verticalDir;
            verticalUnit = verticalUnit;
            bottom = `${vertical}${verticalUnit}`;
        }

        if (horizontalDir === 'left') {
            left = `${horizontal}${horizontalUnit}`;
        } else {
            horizontal = horizontal;
            horizontalUnit = horizontalUnit;
            right = `${horizontal}${horizontalUnit}`;
        }

        return (
            <div className="d-fixed"
                style={{
                    left,
                    right,
                    top,
                    bottom,
                    width: `${width ? `${width}${widthUnit}` : 'auto'}`
                }}
            >
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
            </div>
        )
    }

    render() {
        const { moduleData } = this.props;

        // 装修时的展示
        if (pageType === '0') {
            return (
                <Module moduleData={moduleData}>
                    <span className="d-hint">定位模块效果请在预览页中查看</span>
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