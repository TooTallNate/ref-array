#include <stdlib.h>
#include "v8.h"
#include "node.h"

#ifdef _WIN32
  #define __alignof__ __alignof
#endif

using namespace v8;
using namespace node;

namespace {


void Initialize(Handle<Object> target) {
  HandleScope scope;

}

} // anonymous namespace

NODE_MODULE(native_tests, Initialize);
