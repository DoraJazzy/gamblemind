import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import '../Styles/BaseRateNeglect.css';

const events = [
    { id: '1', name: 'Winning the EuroJackpot', probability: 1 / 139838160 },
    { id: '2', name: 'Becoming a Saint', probability: 1 / 20000000 },
    { id: '3', name: 'Getting struck by lightning ', probability: 1 / 15300 },
    { id: '4', name: 'Finding a four-leaf clover', probability: 1 / 5000 },
    { id: '5', name: 'Coin landing on edge', probability: 1 / 6000 },
];

const types = 'Event';

const EventItem = ({ event, index, moveCardHandler, showOdds }) => {
    const [, ref] = useDrag({ type: types, item: { id: event.id, index } });
    const [, drop] = useDrop({
        accept: types,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveCardHandler(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className="basecard">
            {event.name} {showOdds && `- 1 in ${Math.round(1 / event.probability).toLocaleString()}`}
        </div>
    );
};

const BaseRateNeglect = () => {
    const [orderedEvents, setOrderedEvents] = useState(events);
    const [showOdds, setShowOdds] = useState(false);
    const [feedback, setFeedback] = useState('');

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const draggedEvent = orderedEvents[dragIndex];
        setOrderedEvents(
            update(orderedEvents, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedEvent]],
            })
        );
    };

    const checkOrder = () => {
        const sortedEvents = [...events].sort((a, b) => b.probability - a.probability);
        if (JSON.stringify(orderedEvents) === JSON.stringify(sortedEvents)) {
            setFeedback('✅ Correct! You ordered the events by decreasing probability.');
        } else {
            setFeedback('❌ Incorrect. Try again.');
        }
        setShowOdds(true);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="base-rate-container">
                <h1>Base-Rate Neglect</h1>
                <p>Drag and drop the events to arrange them in order of decreasing probability (from left to right).</p>
                <div className="event-container">
                    {orderedEvents.map((event, index) => (
                        <EventItem key={event.id} index={index} event={event} moveCardHandler={moveCardHandler} showOdds={showOdds} />
                    ))}
                </div>
                <button onClick={checkOrder} className="check-button">Check Order</button>
                <p className="feedback">{feedback}</p>
            </div>
        </DndProvider>
    );
};

export default BaseRateNeglect;
