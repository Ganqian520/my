let nextUnitWork = null //待处理的一个fiber
let wipRoot = null //fiber树根节点
let currentRoot = null //本次提交的fiber树
let deletions = [] //记录要删除的节点

//更新dom属性
function updateDom(dom, prevProps, nextProps) {
    const isEvent = key => key.startsWith('on')
    const isProperty = key => key !== 'children' && !isEvent(key)
    const isGone = next => key => !(key in next)
    const isNew = (prev, next) => key => prev[key] !== next[key]
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
            .forEach(key => {
                const eventType = key.toLoaceLowerCase().substring(2)
                dom.removeEventListener(eventType, prevProps[key])
            })
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
            .forEach(key => {
                const eventType = key.toLocaleLowerCase().substring(2)
                dom.addEventListener(eventType, prevProps[key])
            })
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(nextProps))
        .forEach(key => dom[key] = '')
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(key => dom[key] = nextProps[key])
}

//递归改变真实dom
function commitWork(fiber) {
    if (!fiber) return
    const domParent = fiber.parent.dom
    switch (fiber.effectTag) {
        case 'PLACEMENT':
            !!fiber.dom && domParent.appendChild(fiber.dom)
            break;
        case 'UPDATE':
            !!fiber.dom && updateDom(fiber.dom, fiber.alternate, fiber.props)
            break;
        case 'DELETION':
            !!fiber.dom && domParent.removeChild(fiber.dom)
            break;
        default:
            break;
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
//等fiber树构建完了统一提交渲染
function commitRoot() {
    commitWork(wipRoot.child)
    // console.log(wipRoot);
    deletions.forEach(commitWork)
    currentRoot = wipRoot
    wipRoot = null
}

//协调
function reconcileChildren(wipFiber, elements) {
    let index = 0
    let prevSibling = null
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child
    while (index < elements.length || !!oldFiber) {
        let newFiber = null
        const childElement = elements[index]
        const sameType = oldFiber && childElement && childElement.type === oldFiber.type
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: oldFiber.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }
        }
        if (!sameType && childElement) {
            newFiber = {
                type: childElement.type,
                props: childElement.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        }
        if (!sameType && oldFiber) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }
        if (oldFiber) oldFiber = oldFiber.sibling
        if (index === 0) {
            wipFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
}

//每次处理一个fiber并返回下一个待处理的fiber
function perforUnitOfWork(fiber) {
    //为当前fiber创建真实dom
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    //为当前fiber补充子代fiber
    const elements = fiber?.props?.children
    reconcileChildren(fiber, elements)

    //返回下一个任务单元
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

//递归调用，浏览器空闲时执行
function workLoop(deadline) {
    let shouldYield = true
    while (nextUnitWork && shouldYield) {
        nextUnitWork = perforUnitOfWork(nextUnitWork)
        shouldYield = deadline.timeRemaining() > 1
    }
    if (!nextUnitWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

//为fiber创建真实dom
function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)
    Object.keys(fiber?.props)
        .filter(prop => prop !== 'children')
        .forEach(key => dom[key] = fiber.props[key])
    updateDom(dom, {}, fiber.props)
    return dom
}

export default function render(element, container) {
    console.log(element);
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: wipRoot,
    }
    nextUnitWork = wipRoot
    deletions = []
    requestIdleCallback(workLoop)
}