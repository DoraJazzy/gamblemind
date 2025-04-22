import React, { useState, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import '../Styles/BaseRateNeglect.css';

const events = [
    { id: '1', name: 'Winning the EuroJackpot', probability: 1 / 139838160 },
    { id: '2', name: 'Becoming a Saint', probability: 1 / 20000000 },
    { id: '3', name: 'Getting struck by lightning', probability: 1 / 15300 },
    { id: '4', name: 'Finding a four-leaf clover', probability: 1 / 5000 },
    { id: '5', name: 'Coin landing on edge', probability: 1 / 6000 },
];

const types = 'Event';

const EventItem = React.memo(({ event, index, moveCardHandler, showOdds }) => {
    const nodeRef = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: types,
        item: { id: event.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [dropPosition, setDropPosition] = useState(null);
    const [, drop] = useDrop({
        accept: types,
        hover: useCallback((draggedItem, monitor) => {
            if (!nodeRef.current) return;

            const hoverBoundingRect = nodeRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (draggedItem.index === index) return;

            // Determine drag direction
            if (draggedItem.index < index && hoverClientY < hoverMiddleY) return;
            if (draggedItem.index > index && hoverClientY > hoverMiddleY) return;

            moveCardHandler(draggedItem.index, index);
            draggedItem.index = index;
            setDropPosition(hoverClientY < hoverMiddleY ? 'over-top' : 'over-bottom');
        }, [index, moveCardHandler]),
        drop: () => {
            setDropPosition(null);
        },
    });

    return (
        <div
            ref={(node) => {
                drag(drop(node));
                nodeRef.current = node;
            }}
            className={`basecard ${isDragging ? 'dragging' : ''} ${dropPosition || ''}`}
            style={{ transition: 'transform 0.2s ease' }}
        >
            <div className="card-content">
                <div className="event-name">{event.name}</div>
                {showOdds && (
                    <div className="odds-display">
                        1 in {Math.round(1 / event.probability).toLocaleString()}
                    </div>
                )}
            </div>

            {dropPosition === 'over-top' && (
                <div className="drag-preview" style={{ top: '-10px' }} />
            )}
            {dropPosition === 'over-bottom' && (
                <div className="drag-preview" style={{ bottom: '-10px' }} />
            )}
        </div>
    );
});

const BaseRateNeglect = () => {
    const [orderedEvents, setOrderedEvents] = useState(events);
    const [showOdds, setShowOdds] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [revealing, setRevealing] = useState(false);
    const [checked, setChecked] = useState(false);

    const moveCardHandler = useCallback((dragIndex, hoverIndex) => {
        const draggedEvent = orderedEvents[dragIndex];
        setOrderedEvents(
            update(orderedEvents, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, draggedEvent],
                ],
            })
        );
    }, [orderedEvents]);

    const checkOrder = () => {
        const sortedEvents = [...events].sort((a, b) => b.probability - a.probability);
        const isCorrect = JSON.stringify(orderedEvents) === JSON.stringify(sortedEvents);
        setFeedback(isCorrect ? '✅ Correct! You ordered the events by decreasing probability.' : '❌ Incorrect. Try again.');
        setShowOdds(true);
        setRevealing(true);
        setChecked(true);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`base-rate-container ${checked ? 'checked' : ''}`}>
                <h1>Base-Rate Neglect</h1>
                <p>Drag and drop the events to arrange them in order of decreasing probability (most likely at the top).</p>

                <div className="maincontent">
                    <div className="event-column">
                        <div className="event-container">
                            {orderedEvents.map((event, index) => (
                                <EventItem
                                    key={event.id}
                                    index={index}
                                    event={event}
                                    moveCardHandler={moveCardHandler}
                                    showOdds={showOdds}
                                />
                            ))}
                        </div>
                        <button onClick={checkOrder} className="check-button">Check Order</button>
                        <p className="basefeedback">{feedback}</p>
                    </div>

                    {revealing && (
                        <div className="revealing-base">
                            <h3>What is this bias?</h3>
                            <p>
                                <strong>Base rate neglect</strong> is driven by the availability heuristic—the 
                                mental shortcut where judgments are based on how easily examples come to mind, rather than 
                                objective odds. For instance, gamblers overestimate their chances of winning after seeing 
                                jackpot winners celebrated in media, even though losses are far more common but rarely publicized.
                            </p>
                            <h3>Tip:</h3>
                            <p>
                            Make your own research before stepping into the casino. Check the actual odds, just because 
                            you’ve heard of lottery winners or jackpot payouts doesn’t mean winning is common.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DndProvider>
    );
};

export default BaseRateNeglect;
