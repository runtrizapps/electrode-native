/*
 * Copyright 2017 WalmartLabs
 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 
 * http://www.apache.org/licenses/LICENSE-2.0
 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridgeDelegate.h>)
#import <React/RCTBridgeDelegate.h>
#elif __has_include("RCTBridgeDelegate.h")
#import "RCTBridgeDelegate.h"
#else
#import "React/RCTBridgeDelegate.h"   // Required when used as a Pod in a Swift project
#endif
#import "ElectrodePluginConfig.h"

NS_ASSUME_NONNULL_BEGIN

@interface ElectrodeBridgeDelegate : NSObject <RCTBridgeDelegate>
@property (nonatomic, strong) NSURL *jsBundleURL;

- (instancetype)initWithModuleURL:(NSURL *)url extraModules:(NSArray *)modules;

- (instancetype)initWithContainerConfig: (id<ElectrodePluginConfig>) containerConfig
                         codePushConfig: (id<ElectrodePluginConfig>) codePushConfig;

- (void) setUp;
NS_ASSUME_NONNULL_END
@end


