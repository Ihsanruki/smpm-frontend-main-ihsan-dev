import FormFieldEDC from "@smpm/components/FormFields/FormFieldEDC";
import FormFieldMerchant, {
  TFormFieldMerchant,
} from "@smpm/components/FormFields/FormFieldMerchant";
import FormWrapper from "@smpm/components/FormWrapper";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { createDataMerchant } from "@smpm/services/merchantService";
import { getAllRegion } from "@smpm/services/regionService";
import { IconWashMachine } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Flex, notification } from "antd";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const addMutation = useMutation({
    mutationFn: createDataMerchant,
  });

  const [api] = notification.useNotification();

  const onFinish = (data: TFormFieldMerchant) => {
    addMutation.mutate(
      { ...data, region_id: data.region_id?.id, mid: +data.mid },
      {
        onSuccess: () => {
          api.success({
            message: "Success Create New Merchant.",
          });
          navigate("/merchant/list-merchant");
        },
        onError: () => {
          api.error({
            message: "Something went wrong.",
          });
        },
      }
    );
  };

  return (
    <Page title={"Add New Merchant"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">Add New Merchant</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "/merchant/list-merchant",
                title: (
                  <Flex align={"end"}>
                    <IconWashMachine />
                    <span>List Merchant</span>
                  </Flex>
                ),
              },
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <span>Add New Merchant</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <FormWrapper onFinish={onFinish}>
          <Card title={"Add New Merchant"}>
            <FormFieldMerchant />
            <Button
              type={"primary"}
              htmlType={"submit"}
              loading={addMutation.isPending}
            >
              Submit
            </Button>
          </Card>
        </FormWrapper>
      </PageContent>
    </Page>
  );
};

export default Add;