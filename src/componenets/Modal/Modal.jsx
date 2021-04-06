import style from './Modal.module.sass'
import {Button} from "../Button/Button"
import {any, func, bool} from "prop-types"
import {Container} from "../Container/Container"
import {ColoredLine} from "../ColoredLine/ColoredLine"

export const Modal = ({children, isVisible, onSubmit, onClose, isDisabledSubmit}) => {

    if(!isVisible) return null

    return (
        <div className={style.modalContainer}>
            <div className={style.modalWindow}>

                <Container>
                    {children}
                </Container>

                <div>
                    <ColoredLine/>

                <Container justify={'space-between'} direction={'row'}>
                    <Button
                        color={'#2ecc71'}
                        width={'100px'}
                        height={'35px'}
                        radius={'5px'}
                        textSize={'16px'}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        color={'#e74c3c'}
                        width={'100px'}
                        height={'35px'}
                        radius={'5px'}
                        textSize={'16px'}
                        onClick={onSubmit}
                        disabled={isDisabledSubmit}
                    >
                        Submit
                    </Button>
                </Container>

                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: any,
    isVisible: bool,
    onSubmit: func,
    onClose: func,
}
