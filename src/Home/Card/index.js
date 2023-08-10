const Card = ({name: {common}, timezones, languages, flags:{png, alt}}) => {
    return (
        <>
            <tr>
                <td>{common}</td>
                <td>{timezones.join(', ')}</td>
                <td>{languages ? Object.values(languages).join(', ') : ''}</td>
                <td><img src={png} alt={alt}/></td>
            </tr>
        </>
    )
}
export default Card;