import { useState, useEffect } from "react"
import { Flex, Checkbox, Text, IconButton, IconXSolid, InPlaceEdit } from "@instructure/ui"
import './style.css'

const Item = ({ todo: { text, done }, onToggleDone, onDelete, onTextEdited }) => {

    const [mode, setMode] = useState('view')
    const [value, setValue] = useState(text)

    useEffect(() => {
        setValue(text)
    }, [text])

    return <div className="todo-item" style={{
        minHeight: "50px",
        lineHeight: "50px",
        borderBottom: "solid",
        borderWidth: "1px",
        borderColor: "lightgrey",
        verticalAlign: "middle",
        wordWrap: "break-word"
    }}>
        <Flex>
            <Flex.Item size="40px" margin="small">
                <Checkbox
                    checked={done}
                    onChange={(e) => (onToggleDone(e.target.checked))}
                    label=""
                    themeOverride={done ? {
                        checkedBackground: "lightGrey",
                        checkedBorderColor: "lightGrey"
                    } : {}}
                />
            </Flex.Item>
            <Flex.Item shouldGrow shouldShrink>
                <div style={done ? {
                    textDecoration: "line-through",
                    transition: "color 1s ease",
                    color: "lightgrey"
                } : {
                    transition: "color 1s ease",
                    color: "black"
                }}>
                    <InPlaceEdit
                        renderViewer={() => (
                            <Text size="large">
                                {value}
                            </Text>
                        )
                        }
                        renderEditor={({ onBlur, editorRef }) => (
                            <Text
                                color="primary"
                                size="large"
                                as="input"
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                aria-label="The title"
                                onBlur={onBlur}
                                elementRef={editorRef}
                            />
                        )}
                        renderEditButton={() => { }}
                        onChangeMode={(newMode) => {
                            if (newMode === 'view' && text !== value) {
                                onTextEdited(value)
                            }
                            setMode(newMode)
                        }}
                        mode={mode}
                        value={value}
                        inline={false}
                    />
                </div>
            </Flex.Item>
            <Flex.Item size="40px">
                <div className="hover-handling">
                    <IconButton onClick={onDelete} color="danger"
                        withBackground={false} withBorder={false} screenReaderLabel="Delete todo">
                        <IconXSolid />
                    </IconButton>
                </div>
            </Flex.Item>
        </Flex >
    </div>
}

export default Item