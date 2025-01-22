import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
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
                    else if (formattedTimestamp.includes('hour') || formattedTimestamp.includes('hours')) {
                        formattedTimestamp = `Today at ${format(messageTimestamp, 'hh:mm a')}`;
                    }

                    return (
                        <div
                            key={index}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex flex-col space-y-1 max-w-[70%]">
                                <div className={`flex items-start ${isOwnMessage ? 'flex-row-reverse' : 'space-x-2'}`}>
                                    {!isOwnMessage && (
                                        <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {message.identifier.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className={`p-3 rounded-lg text-sm break-words ${isOwnMessage
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                            }`}
                                    >
                                        <p className={`whitespace-pre-wrap ${isOwnMessage ? 'text-white' : 'text-gray-900'}`}>
                                            {message.text}
                                        </p>
                                    </div>
                                </div>

                                <div className={`text-xs ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                                    <div className={`flex items-center gap-1 text-gray-500 ${isOwnMessage ? 'justify-end' : 'ml-10'
                                        }`}>
                                        <span className="font-bold">
                                            {isOwnMessage ? 'You' : message.identifier}
                                        </span>
                                        <LuDot className="flex-shrink-0" />
                                        <span>
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