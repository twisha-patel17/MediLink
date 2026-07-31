

const emergencyContacts = [
    {
        title: "National Emergency",
        number: "112",
        description: "Police, Fire and Ambulance Services",
    },
    {
        title: "Ambulance",
        number: "108",
        description: "Emergency Medical Services",
    },
    {
        title: "Medical Helpline",
        number: "102",
        description: "Medical Transport Services",
    },
    {
        title: "Women Helpline",
        number: "1091",
        description: "Women's Safety Assistance",
    },
];

export const EmergencyContact = () => {
    return (
        <div
            className="
            rounded-2xl
            border
            border-[#E2E4EC]
            bg-white
            p-6
            shadow-sm
            "
        >
            <h2
                className="
                text-2xl
                font-bold
                text-[#11131A]
                "
            >
                Emergency Contacts
            </h2>

            <p
                className="
                mt-2
                text-[#6B7280]
                "
            >
                Quick access to important emergency services whenever
                you need immediate assistance.
            </p>

            <div
                className="
                mt-6
                space-y-4
                "
            >
                {emergencyContacts.map((contact) => (
                    <div
                        key={contact.number}
                        className="
                        flex
                        flex-col
                        gap-4
                        rounded-xl
                        border
                        border-[#E2E4EC]
                        p-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        "
                    >
                        <div>
                            <h3
                                className="
                                text-lg
                                font-semibold
                                text-[#11131A]
                                "
                            >
                                {contact.title}
                            </h3>

                            <p
                                className="
                                text-sm
                                text-[#6B7280]
                                "
                            >
                                {contact.description}
                            </p>
                        </div>

                        <a
                            href={`tel:${contact.number}`}
                            className="
                            rounded-xl
                            bg-[#1D4ED8]
                            px-5
                            py-3
                            text-center
                            font-medium
                            text-white
                            transition
                            hover:bg-[#15359E]
                            "
                        >
                            Call {contact.number}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyContact;