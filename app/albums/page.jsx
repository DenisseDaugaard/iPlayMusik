export default async function TrackPlayerById ({ trackId }) {

    const track = await trackId();

    return (
        <h1>{track}</h1>
    )

}