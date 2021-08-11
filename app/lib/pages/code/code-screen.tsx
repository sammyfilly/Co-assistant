import React, { useEffect, useState } from "react";
import CodeBox from "../../components/codebox";
import { Preview } from "../../components/preview";
import {
  EK_GENERATED_CODE_PLAIN,
  EK_IMAGE_ASSET_REPOSITORY_MAP,
  EK_SET_APP_MODE,
} from "../../constants/ek.constant";
import { repo_assets } from "@design-sdk/core";
import { assistant as analytics } from "@analytics.bridged.xyz/internal";
import {
  Framework,
  FrameworkOption,
  Language,
  react_presets,
} from "./framework-option";
import { CodeScreenControl } from "./code-screen-control";
import { WorkScreen } from "../../states/app-state";
interface CodeScreenProps {
  placeholderSource: string;
  // framework?: Framework;
  // formatter: ;
}

type Formatter = (source: string) => string;

type DesigntoCodeUserOptions = FrameworkOption;
import { format as dart_format } from "../../utils/dart-format";

const formatter_by_lang = (lang: Language): Formatter => {
  switch (lang) {
    case Language.dart:
      return dart_format;
    case Language.jsx:
    case Language.tsx:
      return (s) => s;
  }
};

export function CodeScreen(props: CodeScreenProps) {
  const [source, setSource] = useState<string>(props.placeholderSource);
  const [app, setApp] = useState<string>();
  const [useroption, setUseroption] = React.useState<DesigntoCodeUserOptions>(
    react_presets.react_default
  );

  const formatter = formatter_by_lang(useroption.language);
  const onMessage = (ev: MessageEvent) => {
    const msg = ev.data.pluginMessage;
    if (msg) {
      switch (msg.type) {
        case EK_GENERATED_CODE_PLAIN:
          const app = formatter(msg.data.app);
          console.log(`$c ${app}`, "color: red");
          const code = formatter(msg.data.code);
          setSource(code);
          setApp(app);
          analytics.event_selection_to_code({
            framework: useroption.framework,
          });

          break;
        case EK_IMAGE_ASSET_REPOSITORY_MAP:
          const imageRepo =
            msg.data as repo_assets.TransportableImageRepository;
          repo_assets.ImageHostingRepository.setRepository(imageRepo);
          break;
      }
    } else {
      // ignore
    }
  };

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return function cleaup() {
      window.removeEventListener("message", onMessage);
    };
  }, [useroption.language]);

  // post to code thread about target framework change
  useEffect(() => {
    /**
     * region DIRTY CODE FIXME: !!!
     */
    // region get workscreen name (FOR PREV VER)
    let _frameworknameforeventtransport: WorkScreen;
    switch (useroption.framework) {
      case Framework.flutter:
        _frameworknameforeventtransport = WorkScreen.code_flutter;
        break;
      case Framework.react:
        _frameworknameforeventtransport = WorkScreen.code_react;
        break;
    }

    // endregion get workscreen name
    parent.postMessage(
      {
        pluginMessage: {
          type: EK_SET_APP_MODE,
          // TODO: provide other options INCLUDING framework info, currently we only provide framework info for last version compatibility.
          data: _frameworknameforeventtransport,
        },
      },
      "*"
    );
    /**
     * endregion DIRTY CODE FIXME: !!!
     */

    console.log("setting from view as.. ", _frameworknameforeventtransport);
  }, [useroption.framework]);

  const onOptionChange = (op: DesigntoCodeUserOptions) => {
    console.log("onOptionChange", op);
    setUseroption(op);
  };
  return (
    <div>
      <Preview auto />
      <CodeScreenControl
        // key={JSON.stringify(useroption)} // FIXME: do not uncomment me
        // initialPreset="react_default" // FIXME: do not uncomment me
        onUseroptionChange={onOptionChange}
      />
      <CodeBox
        language={_src_view_language(useroption.framework)}
        app={app}
        code={source}
      ></CodeBox>
    </div>
  );
}

/**
 * get language by framework (default) (for code display) (non critical)
 *
 * -- used by code view (for styling only - used by highlight js)
 */
const _src_view_language = (framework: string): string => {
  switch (framework) {
    case "flutter":
      return "dart";
    case "react":
      return "jsx";
    default:
      throw `default language for code display on framework "${framework}" is not supported`;
  }
};
