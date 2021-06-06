import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styled, { StyledInterface, keyframes } from 'styled-components';
import classname from 'classnames';
(window as any).styled = styled;
console.log(styled);
const Container = styled.div<Pick<ImportLoadingState, "open">>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    transition: all 1s ease;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => !!props.open ? 1 : 0};
    '&.open': {
        opacity: 1;
    },
    '&.close': {
        opacity: 0;
    }
`

export type ImportLoadingProps = {
    children?: JSX.Element;
}

export type ImportLoadingState = {
    open: boolean;
}

export type ImportLoadingRef = {
    open: () => void;
    close: () => void;
}

export const ImportLoading = forwardRef((props: ImportLoadingProps, ref) => {
    const [open, setOpen] = useState(false);
    const openHandler = useCallback(() => {
        setOpen(true);
    }, [open]);
    const closeHandler = useCallback(() => {
        setOpen(false);
    }, [open]);

    useImperativeHandle(ref, () => ({
        open: openHandler,
        close: closeHandler
    }))

    return (
        <Container id="dynamic-scipt-loading" open={open} className={classname({ open, close: !open })}>{props.children}</Container>
    );
});


const squarejellyboxanimate = keyframes`
    17%{border-bottom-right-radius:10%}
    25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}
    50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1, 0.9) rotate(45deg);transform:translateY(50%) scale(1, 0.9) rotate(45deg)}
    75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}
    100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}
`;
const squarejellyboxshadow = keyframes`
   50%{-webkit-transform:scale(1.25, 1);transform:scale(1.25, 1)}
`;
const DefaultLoadingContainer = styled.div`
    position:relative;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    display:block;
    font-size:0;
    color:#fff;
    width:64px;
    height:64px;
    &>div {
        position:relative;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
    }
    &>div:nth-child(1),&>div:nth-child(2) {position:absolute;left:0;width:100%}
    &>div:nth-child(1) {
        top:-25%;
        z-index:1;
        height:100%;
        border-radius:10%;
        background: #30b2f3;
        -webkit-animation:${squarejellyboxanimate} 0.6s -0.1s linear infinite;
        -moz-animation:${squarejellyboxanimate} 0.6s -0.1s linear infinite;
        -o-animation:${squarejellyboxanimate} 0.6s -0.1s linear infinite;
        animation:${squarejellyboxanimate} 0.6s -0.1s linear infinite;
    }
    &>div:nth-child(2) {
        bottom:-9%;height:10%;
        background:#000;
        border-radius:50%;
        opacity:.2;
        -webkit-animation:${squarejellyboxshadow} 0.6s -0.1s linear infinite;
        -moz-animation:${squarejellyboxshadow} 0.6s -0.1s linear infinite;
        -o-animation:${squarejellyboxshadow} 0.6s -0.1s linear infinite;
        animation:${squarejellyboxshadow} 0.6s -0.1s linear infinite;
    }
`;

export function DefaultLoading() {
    return (
        <DefaultLoadingContainer>
            <div />
            <div />
        </DefaultLoadingContainer>
    );
}