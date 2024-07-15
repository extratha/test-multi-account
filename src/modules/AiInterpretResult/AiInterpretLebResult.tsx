import { Button, Collapse, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";

import { IconChevronDown, IconChevronUp, IconLabStatusBlack } from "@/assets";
import { HEMATOLOGY_BLOOD, HEMATOLOGY_BLOOD_GROUP, HEMATOLOGY_CBC, HEMATOLOGY_CBC_GROUP } from "@/constant/constant";
import useTranslation from "@/locales/useLocale";
import { InputData, InputDataResult } from "@/types/model.api";
import { LabGroupConfig } from "@/types/model.ui";
import AiInterpretLabUnit from "./AiInterpretLabUnit";

export interface AiInterpretLabResultProps {
  name: string;
  group: InputDataResult;
}

interface SubGroup {
  group: string;
  groupName: InputData[];
}

const LAB_SUB_GROUPS: Record<string, LabGroupConfig[]> = {
  hematologyBG: [
    {
      group: HEMATOLOGY_BLOOD_GROUP.HEMATOLOGY_BLOOD,
      value: [HEMATOLOGY_BLOOD.BLOOD_GROUP, HEMATOLOGY_BLOOD.BLOOD_GROUP_RH],
    },
  ],
  hematologyCBC: [
    {
      group: HEMATOLOGY_CBC_GROUP.HEMOGLOBIN,
      value: [HEMATOLOGY_CBC.HB, HEMATOLOGY_CBC.HCT],
    },
    {
      group: HEMATOLOGY_CBC_GROUP.RED_BLOOD,
      value: [HEMATOLOGY_CBC.MCV, HEMATOLOGY_CBC.MCH, HEMATOLOGY_CBC.MCHC, HEMATOLOGY_CBC.RBC_MORPHOLOGY],
    },
    {
      group: HEMATOLOGY_CBC_GROUP.WHITE_BLOOD,
      value: [
        HEMATOLOGY_CBC.WBC,
        HEMATOLOGY_CBC.LYMPHOCYTE,
        HEMATOLOGY_CBC.NEUTROPHIL,
        HEMATOLOGY_CBC.MONOCYTE,
        HEMATOLOGY_CBC.EOSINOPHIL,
        HEMATOLOGY_CBC.BASOPHIL,
        HEMATOLOGY_CBC.PLATELET_COUNT,
      ],
    },
  ],
};

const Lab = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.background.borderLight}`,
  borderRadius: "8px",
  overflow: "hidden",
  "& .MuiButton-root": {
    fontSize: "12px",
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.text.hight,
    "&:hover": {
      backgroundColor: theme.palette.text.hight,
    },
  },
  "& .MuiButton-endIcon": {
    paddingLeft: "8px",
  },
}));

const IconLabStatus = styled(IconLabStatusBlack)({
  position: "absolute",
});

const LabHeader = styled(Stack)(({ theme }) => ({
  padding: "24px 12px 12px 40px",
  justifyContent: "space-between",
  backgroundColor: theme.palette.surfaceGray.lowest,
}));

const LabTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
});

const ButtonCollapse = styled(Button)({
  padding: "8px 14px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px -1px #21212133, 0px 2px 4px -2px #21212133",
  "& svg": {
    width: "16px",
    height: "16px",
  },
});

const AiInterpretLabResult = (props: AiInterpretLabResultProps) => {
  const { name, group } = props;
  const { translation } = useTranslation();
  const [isExpand, setIsExpand] = useState(false);

  const subGroups = LAB_SUB_GROUPS[group.groupName] || [];

  const subGroupData = useMemo(() => {
    return subGroups.map((item) => {
      const dataInput = group.data.filter((items) => {
        return item.value.find((key) => key === items.key);
      });
      const subGroupItem: SubGroup = {
        group: item.group,
        groupName: dataInput,
      };
      return subGroupItem;
    });
  }, [group.data.length]);

  const dataNoSubGroup = useMemo(() => {
    return group.data.filter((item) => {
      const values = subGroups.flatMap((itemName) => itemName.value);
      return !values.includes(item.key);
    });
  }, [group.data.length]);

  const handleToggleCollapse = () => {
    setIsExpand(!isExpand);
  };

  return (
    <Lab>
      <IconLabStatus />
      <LabHeader direction="row">
        <Stack direction="row">
          <LabTitle variant="titleBold" data-testid={`${name}-title-${group.groupName}`}>
            {translation(`AiInterpret.aiInterpretResult.lab.group.${group.groupName}.title`)}
          </LabTitle>
        </Stack>
        <ButtonCollapse
          onClick={handleToggleCollapse}
          endIcon={isExpand ? <IconChevronUp /> : <IconChevronDown />}
          data-testid={`${name}-${group.groupName}-button-collapse`}
        >
          {translation("AiInterpret.aiInterpretResult.lab.seeResults")}
        </ButtonCollapse>
      </LabHeader>
      <Collapse in={isExpand}>
        <Stack spacing="16px" padding="12px 24px">
          {dataNoSubGroup.map((itemNoSubGroup, index) => (
            <AiInterpretLabUnit
              key={`lab-unit-${group.groupName}-${index}`}
              name={name}
              groupName={group.groupName}
              inputData={itemNoSubGroup}
            />
          ))}
          {subGroupData.length > 0 && (
            <Stack spacing="16px" divider={<Divider flexItem />}>
              {subGroupData.map((itemSubGroup, index) => (
                <Stack
                  key={`sub-group-key-${group.groupName}-${itemSubGroup.group}-${index}`}
                  spacing="16px"
                  data-testid={`${name}-title-sub-${group.groupName}-${itemSubGroup.group}`}
                >
                  <Typography variant="titleBold">
                    {translation(`AiInterpret.aiInterpretResult.lab.group.${group.groupName}.${itemSubGroup.group}`)}
                  </Typography>
                  {itemSubGroup.groupName.map((key, index) => (
                    <AiInterpretLabUnit
                      key={`lab-unit-${group.groupName}-${index}`}
                      name={name}
                      groupName={group.groupName}
                      inputData={key}
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Collapse>
    </Lab>
  );
};

export default AiInterpretLabResult;
