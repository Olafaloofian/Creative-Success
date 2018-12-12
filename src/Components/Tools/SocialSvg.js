import React from 'react'
import socialIcons from '../../Assets/socialIcons.svg'
import PropTypes from 'prop-types'

const SocialSvg = ({ name, color, size }) => (
    <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
        <use xlinkHref={`${socialIcons}#social-${name}`} />
    </svg>
)

SocialSvg.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
}

export default SocialSvg