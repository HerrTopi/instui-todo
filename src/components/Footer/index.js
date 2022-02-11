import { Flex, Button } from '@instructure/ui'

const Footer = ({ filter, onFilter, itemsLeft }) => {


    return <Flex>
        <Flex.Item shouldShrink size="25%">
            <div style={{ color: "grey" }}>
                {`${itemsLeft} item${itemsLeft === 1 ? "" : "s"} left`}
            </div>
        </Flex.Item>
        <Flex.Item shouldGrow textAlign='center'>
            <Button onClick={onFilter("all")} color={filter === "all" ? "primary-inverse" : "secondary"} margin='small'>All</Button>
            <Button onClick={onFilter("active")} color={filter === "active" ? "primary-inverse" : "secondary"} margin='small'>Active</Button>
            <Button onClick={onFilter("completed")} color={filter === "completed" ? "primary-inverse" : "secondary"} margin='small'>Completed</Button>
        </Flex.Item>
        <Flex.Item shouldShrink size="25%"></Flex.Item>
    </Flex >
}

export default Footer