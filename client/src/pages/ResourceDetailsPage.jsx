import DashboardLayout from "../layouts/DashboardLayout";

import { PhotoCarousel } from "../components/resource/PhotoCarousel";
import { ResourceDetails } from "../components/resource/ResourceDetails";
import { Map } from "../components/common/Map";

export const ResourceDetailsPage = () => {
    return (
        <DashboardLayout>

            <div className="space-y-8">

                <PhotoCarousel />

                <div className="grid grid-cols-2 gap-8">

                    <ResourceDetails />

                    <Map />

                </div>

            </div>

        </DashboardLayout>
    );
};

export default ResourceDetailsPage;