import React from 'react'

const GlassPane = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <div className={'glass rounded-2xl border-solid border-2 border-gray-200' + className ? className : ''}>
            {children}
        </div>
    )
}

export default GlassPane