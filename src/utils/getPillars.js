import axios from "axios"

export const getPillar1 = async (setSinglePillarProject, setLoading, userToken, id) => {
    try {
        if (userToken) {
            setLoading(true)
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/pillar/5/view`,

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            console.log('newdataaafrom dave', res.data.data)
            setSinglePillarProject(res.data.data.find((X) => X.id === Number(id)))
            setLoading(false)
        }
    } catch (error) {
        console.log('errorrrrrrrrrff', error)
    }
}
