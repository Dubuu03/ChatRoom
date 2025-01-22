import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { LuDot } from "react-icons/lu";

const ChatMessages = ({ messages, identifier, messageEndRef }) => {
    return (
        <div className="p-4 space-y-4 h-80 overflow-y-auto card-body">
            {messages.length > 0 ? (
                messages.map((message, index) => {
                    const isOwnMessage = message.identifier === identifier;
                    const messageTimestamp = new Date(message.timestamp);
                    let formattedTimestamp = formatDistanceToNow(messageTimestamp, { addSuffix: true });


                    if (formattedTimestamp.includes('less than a minute')) {
                        formattedTimestamp = 'Just now';
                    }

                    return (
                        <div
                            key={index}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex flex-col space-y-1 max-w-xs">
                                <div className={`flex items-center ${isOwnMessage ? 'flex-row-reverse' : 'space-x-2'}`}>
                                    {/* Show identifier for other messages */}
                                    {!isOwnMessage && (
                                        <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {message.identifier.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className={`p-3 rounded-lg text-sm ${isOwnMessage
                                            ? 'bg-indigo-500 text-white text-right'
                                            : 'bg-gray-100 text-gray-900 text-left'
                                            }`}
                                    >
                                        <p className={`${isOwnMessage ? 'text-white' : 'text-gray-900'}`}>
                                            {message.text}
                                        </p>
                                    </div>
                                    {/* Show identifier for own messages */}

                                </div>
                                {/* Bold identifier below the message bubble */}
                                <div className={`text-xs mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                                    <div className={`flex items-center ${isOwnMessage ? 'justify-end' : 'justify-start'} w-full`}>
                                        <span className={`text-gray-500 font-bold  ${isOwnMessage ? '' : 'ml-10'}`}>
                                            {isOwnMessage ? 'You' : message.identifier}
                                        </span>
                                        <span className="text-gray-500 ml-1"> <LuDot /> </span>
                                        <span className={`text-gray-500 ${isOwnMessage ? 'text-right' : 'text-left'} ml-1`}>
                                            {formattedTimestamp}
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500 text-center">No messages yet</p>
            )}
            <div ref={messageEndRef} />
        </div>
    );
};

export default ChatMessages;
